/** CLIENT SETUP: this is the single source of truth. Blank optional fields are hidden.
 * The display name is a DESIGN PLACEHOLDER. Replace it with the real business name.
 * Only enable confirmed services and replace illustrations with authorised fleet photos.
 */
export const business = {
  name: 'Chengannur Travels', // PLACEHOLDER: replace with registered/trading name
  nameConfirmed: false,
  phone: '+91 7736935523', // +91 9496265153 PLACEHOLDER: real international number, e.g. +<country><number>
  whatsapp: '917736935523', // PLACEHOLDER: international digits only, no +, spaces or leading zero
  address: 'chengannur , Alappuzha', mapUrl: 'https://maps.app.goo.gl/k29TEVy1QwxkzjUh8', hours: '9am - 5 pm', email: 'chengannur@gmail.com', websiteUrl: '',
  serviceArea: 'Chengannur',
  routes: [] as string[], // Add only confirmed pickup/drop destinations
  intro: 'Planning a local journey, a pilgrim trip, or travel with your group? Share your travel details and ask about a vehicle that suits your passenger count.',
  strengths: ['Choose a size for your group', 'Discuss your pickup and destination', 'Confirm the fare before you travel'],
  socials: [] as {label: string; url: string}[],
  services: [
    { title: 'Local journeys', text: 'Transport enquiries for travel in and around Chengannur.', icon: 'pin', enabled: true },
    { title: 'Sabarimala pilgrim trips', text: 'Plan your group journey. Confirm permitted pickup and drop points with the operator.', icon: 'mountain', enabled: true },
    { title: 'Travel together', text: 'Explore transport options for families and larger groups, from 7 to 49 seats.', icon: 'people', enabled: true },
    { title: 'Station pickup & drop', text: 'CLIENT CONFIRMATION REQUIRED: add actual station pickup details before enabling.', icon: 'pin', enabled: false },
  ],
  // Illustrative capacity categories, NOT an inventory or current availability claim.
  vehicles: [
    { id: 'family', name: '7-seat travel', capacity: '7 seats', preference: '7 seats', image: '/images/van.svg', alt: 'Illustration of a passenger vehicle', type: 'For smaller groups', ac: '', luggage: '' },
    { id: 'group', name: 'Group transport', capacity: 'Ask for a suitable size', preference: 'Help me choose', image: '/images/minibus.svg', alt: 'Illustration of a group passenger vehicle', type: 'For your group size', ac: '', luggage: '' },
    { id: 'bus', name: 'Bus travel', capacity: 'Up to 49 seats', preference: 'Up to 49 seats', image: '/images/bus.svg', alt: 'Illustration of a passenger bus', type: 'For larger groups', ac: '', luggage: '' },
  ],
  faqs: [
    { question: 'How do I request a quote?', answer: 'Share your pickup, destination, travel date and passenger count using the enquiry form. It prepares a WhatsApp message for you to send.' },
    { question: 'Which pickup and drop points are covered?', answer: 'Ask the operator to confirm your exact route and any applicable access restrictions. Sabarimala pickup and drop points must be confirmed for your travel date.' },
    { question: 'Can I enquire about a return trip?', answer: 'Yes. Choose Return trip in the form and add your return date. Availability and arrangements are confirmed by the operator.' },
    { question: 'How is the fare confirmed?', answer: 'Request a quote for your trip. Before agreeing, confirm the total fare and whether waiting time, tolls, parking or other charges apply.' },
    { question: 'Does this form confirm my booking?', answer: 'No. The form opens a WhatsApp enquiry. You must press Send in WhatsApp, and the operator must confirm availability, fare and booking arrangements.' },
  ],
};
