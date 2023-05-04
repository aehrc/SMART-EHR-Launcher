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

import moment from "moment";

const RE_YEAR = /\d{4}$/;
const RE_MONTH_YEAR = /\d{4}-d{2}$/;
export const SMART_ENDPOINT = "https://launch.smarthealthit.org";

export const QUERY_HEADERS = {
  "Content-Type": "application/json+fhir; charset=UTF-8",
  Accept: "application/json+fhir; charset=utf-8",
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

  if (!dob || patient.deceasedBoolean) return "";

  // If deceasedDateTime exists, we have a death date so show age as
  // the range between date of birth and date of death.
  if (patient.deceasedDateTime)
    return moment
      .duration(moment(patient.deceasedDateTime).diff(moment(dob)))
      .humanize();
  // return moment(deceasedDateTime).diff(moment(dob), 'years') + " (deceased)";

  //fix year or year-month style dates
  if (RE_YEAR.test(dob)) dob = dob + "-01";
  if (RE_MONTH_YEAR.test(dob)) dob = dob + "-01";

  return moment(dob)
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

  return out;
}

export function getFhirServerBaseUrl() {
  return `${SMART_ENDPOINT}/v/r4/fhir`;
}

export function getQuestionnaireServerBaseUrl() {
  return `https://api.smartforms.io/fhir`;
}
