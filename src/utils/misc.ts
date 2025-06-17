/*
 * Copyright 2025 Commonwealth Scientific and Industrial Research
 * Organisation (CSIRO) ABN 41 687 119 230.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type {
  Patient as R2Patient,
  Practitioner as R2Practitioner,
} from "fhir/r2";
import type {
  Patient as R3Patient,
  Practitioner as R3Practitioner,
} from "fhir/r3";
import type {
  Patient as R4Patient,
  Practitioner as R4Practitioner,
} from "fhir/r4";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

const RE_YEAR = /\d{4}$/;
const RE_MONTH_YEAR = /\d{4}-d{2}$/;

export const QUERY_HEADERS = {
  "Content-Type": "application/fhir+json",
  Accept: "application/fhir+json",
  "Cache-Control": "no-cache",
};

type FHIRPerson =
  | R2Patient
  | R3Patient
  | R4Patient
  | R2Practitioner
  | R3Practitioner
  | R4Practitioner;

export function formatAge(patient: R2Patient | R3Patient | R4Patient): string {
  let dob = patient.birthDate;

  if (!dob || patient.deceasedBoolean) {
    return "";
  }

  // If deceasedDateTime exists, we have a death date so show age as
  // the range between date of birth and date of death.
  if (patient.deceasedDateTime)
    return dayjs
      .duration(dayjs(patient.deceasedDateTime).diff(dayjs(dob)))
      .humanize();

  // fix year or year-month style dates
  if (RE_YEAR.test(dob)) dob = dob + "-01";
  if (RE_MONTH_YEAR.test(dob)) dob = dob + "-01";

  return dayjs(dob)
    .fromNow(true)
    .replace("a ", "1 ")
    .replace(/minutes?/, "min");
}

function toArray(x: any) {
  if (!Array.isArray(x)) {
    return [x];
  }
  return x;
}

export function humanName(human: FHIRPerson, separator = " "): string {
  let names = human.name || [];
  if (!Array.isArray(names)) {
    names = [names];
  }

  let name = names[0];

  if (!name) {
    name = { family: ["No Name Listed"] };
  }

  const prefix = toArray(name.prefix || "")
    .filter(Boolean)
    .join(" ");
  const given = toArray(name.given || "")
    .filter(Boolean)
    .join(" ");
  const family = toArray(name.family || "")
    .filter(Boolean)
    .join(" ");

  let out = [prefix, given, family].filter(Boolean).join(separator || " ");

  if (name.suffix) {
    out += ", " + name.suffix;
  }

  // Use name.text if no other name parts are available
  if (out === "No Name Listed" && name.text) {
    return name.text;
  }

  return out;
}
