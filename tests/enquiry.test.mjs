import test from "node:test";
import assert from "node:assert/strict";
import {
  localDate,
  phoneHref,
  whatsappHref,
  validateTrip,
  tripMessage,
} from "../lib/enquiry.mjs";
const trip = {
  name: "Anu & family",
  pickup: "Chengannur station",
  destination: "Destination to confirm",
  date: "2030-05-10",
  time: "09:30",
  passengers: "7",
  capacity: "7 seats",
  trip: "One-way",
  returnDate: "",
  notes: "Two bags & a child",
};
test("local date uses the local calendar", () =>
  assert.equal(localDate(new Date(2030, 0, 2, 23, 59)), "2030-01-02"));
test("required fields and passenger bounds", () => {
  assert.deepEqual(validateTrip(trip, "2030-05-01"), {});
  for (const n of ["", "0", "50", "1.5", "seven"])
    assert.ok(
      validateTrip({ ...trip, passengers: n }, "2030-05-01").passengers,
    );
  for (const key of ["name", "pickup", "destination", "date", "capacity"])
    assert.ok(validateTrip({ ...trip, [key]: " " }, "2030-05-01")[key]);
});
test("past, invalid, same-day and return dates", () => {
  assert.ok(validateTrip(trip, "2030-05-11").date);
  assert.ok(validateTrip({ ...trip, date: "2030-02-30" }, "2030-01-01").date);
  assert.deepEqual(validateTrip(trip, "2030-05-10"), {});
  assert.ok(
    validateTrip({ ...trip, trip: "Return trip" }, "2030-05-01").returnDate,
  );
  assert.ok(
    validateTrip(
      { ...trip, trip: "Return trip", returnDate: "2030-05-09" },
      "2030-05-01",
    ).returnDate,
  );
  assert.deepEqual(
    validateTrip(
      { ...trip, trip: "Return trip", returnDate: "2030-05-10" },
      "2030-05-01",
    ),
    {},
  );
  assert.ok(
    validateTrip(
      { ...trip, trip: "Return trip", returnDate: "2030-99-99" },
      "2030-05-01",
    ).returnDate,
  );
});
test("contact placeholders do not produce fake links", () => {
  assert.equal(phoneHref(""), "");
  assert.equal(phoneHref("REPLACE_ME"), "");
  assert.equal(whatsappHref("", "hello"), "");
  assert.equal(whatsappHref("+12345678901", "hello"), "");
  assert.equal(phoneHref("+1 (234) 567-8901"), "tel:+12345678901");
});
test("WhatsApp is encoded and includes trip and booking disclaimer", () => {
  const message = tripMessage({
    ...trip,
    trip: "Return trip",
    returnDate: "2030-05-11",
  });
  const link = whatsappHref("12345678901", message);
  assert.equal(new URL(link).searchParams.get("text"), message);
  assert.match(message, /Anu & family/);
  assert.match(message, /Vehicle preference: 7 seats/);
  assert.match(message, /Return date: 2030-05-11/);
  assert.match(message, /not a confirmed booking/);
  assert.doesNotMatch(tripMessage(trip), /Return date:/);
});
test("navigation targets, accessibility and safe links are present", async () => {
  const { readFile } = await import("node:fs/promises");
  const source = await readFile(
    new URL("../components/TransportSite.tsx", import.meta.url),
    "utf8",
  );
  for (const id of [
    "home",
    "services",
    "vehicles",
    "about",
    "contact",
    "enquiry",
  ])
    assert.ok(source.includes(`id="${id}"`));
  assert.match(source, /aria-expanded/);
  assert.match(source, /Escape/);
  assert.match(source, /aria-invalid/);
  assert.match(source, /noopener noreferrer/);
});
