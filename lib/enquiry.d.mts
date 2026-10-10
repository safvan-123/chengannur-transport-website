export function localDate(now?: Date): string;
export function validWhatsApp(number: string): boolean;
export function phoneHref(number: string): string;
export function whatsappHref(number: string, message: string): string;
export function validateTrip(data: Record<string,string>, today?: string): Record<string,string>;
export function tripMessage(data: Record<string,string>): string;
