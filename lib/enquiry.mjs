export function localDate(now = new Date()) { return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`; }
export function validWhatsApp(number) { return /^[1-9]\d{6,14}$/.test(number); }
export function phoneHref(number) { const cleaned = number.replace(/[\s()-]/g, ''); return /^\+?[1-9]\d{6,14}$/.test(cleaned) ? `tel:${cleaned}` : ''; }
export function whatsappHref(number, message) { return validWhatsApp(number) ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : ''; }
export function validateTrip(data, today = localDate()) {
  const errors = {};
  for (const field of ['name','pickup','destination','date','capacity']) if (!String(data[field] || '').trim()) errors[field] = 'Please complete this field.';
  if (data.date && (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(Date.parse(data.date)) || new Date(data.date).toISOString().slice(0,10) !== data.date)) errors.date = 'Choose a valid travel date.';
  else if (data.date && data.date < today) errors.date = 'Travel date cannot be in the past.';
  if (!/^\d+$/.test(String(data.passengers)) || Number(data.passengers) < 1 || Number(data.passengers) > 49) errors.passengers = 'Enter between 1 and 49 passengers. For larger groups, call the operator.';
  if (data.trip === 'Return trip') {
    if (!data.returnDate) errors.returnDate = 'Choose your return date.';
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(data.returnDate) || Number.isNaN(Date.parse(data.returnDate)) || new Date(data.returnDate).toISOString().slice(0,10) !== data.returnDate) errors.returnDate = 'Choose a valid return date.';
    else if (data.returnDate < data.date || data.returnDate < today) errors.returnDate = 'Return date must be on or after your travel date.';
  }
  return errors;
}
export function tripMessage(data) {
  return ['Hello, I would like to request availability and a quote.', '', `Name: ${data.name.trim()}`, `Pickup: ${data.pickup.trim()}`, `Destination: ${data.destination.trim()}`, `Travel date: ${data.date}`, ...(data.time ? [`Pickup time: ${data.time}`] : []), `Passengers: ${data.passengers}`, `Vehicle preference: ${data.capacity}`, `Trip: ${data.trip}`, ...(data.trip === 'Return trip' ? [`Return date: ${data.returnDate}`] : []), ...(data.notes?.trim() ? [`Additional details: ${data.notes.trim()}`] : []), '', 'Please confirm the vehicle, pickup/drop arrangements and total fare. This is an enquiry, not a confirmed booking.'].join('\n');
}
