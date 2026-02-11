/**
 * Business information — single source of truth.
 * All addresses, phone numbers, emails, hours, and social links live here.
 */

export interface LocationInfo {
  id: string;
  name: string;
  label: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    full: string;
  };
  phones: string[];
  orderUrl?: string;
}

export const LOCATIONS: LocationInfo[] = [
  {
    id: "markham",
    name: "MARKHAM",
    label: "MARKHAM",
    address: {
      street: "72-30 Karachi Dr",
      city: "Markham",
      province: "ON",
      postalCode: "L3S 0B6",
      full: "72-30 Karachi Dr, Markham, ON L3S 0B6",
    },
    phones: ["289.554.5999"],
  },
  {
    id: "scarborough",
    name: "SCARBOROUGH",
    label: "SCARBOROUGH",
    address: {
      street: "80 Nashdene Rd",
      city: "Scarborough",
      province: "ON",
      postalCode: "M1V 5E4",
      full: "80 Nashdene Rd, Scarborough, ON M1V 5E4",
    },
    phones: ["416.299.1999", "416.388.4791"],
  },
];

export const CONTACT = {
  email: "newnanthuskitchen@gmail.com",
} as const;

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/newnanthuskitchen",
  facebook: "https://www.facebook.com/newnanthuskitchen",
  tiktok: "https://www.tiktok.com/@newnanthuskitchen",
} as const;

export const BRAND = {
  name: "New Nanthu's Kitchen",
  tagline: "Authentic Jaffna Cuisine",
  copyright: `© ${new Date().getFullYear()} New Nanthu's Kitchen. Crafted with passion & spice.`,
  createdBy: {
    name: "AK Vision Systems",
    url: "https://www.akvisionsystems.com",
  },
} as const;
