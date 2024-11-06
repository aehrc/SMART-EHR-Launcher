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
import { FHIR_SERVER_URL, FORMS_SERVER_URL } from "@/globals.ts";

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

export function getFhirServerBaseUrl() {
  return FHIR_SERVER_URL;
}

export function getQuestionnaireServerBaseUrl() {
  return FORMS_SERVER_URL;
}
