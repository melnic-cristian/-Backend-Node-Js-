import { Connection } from "./connection";
import { Flag } from "./flag";
import { Timezone } from "./timezone";

export type IpData = { 
    success: boolean; 
    type: string; 
    continent: string; 
    continent_code: string; 
    country: string; 
    country_code: string; 
    region: string; 
    region_code: string; 
    city: string; 
    latitude: number; 
    longitude: number; 
    is_eu: boolean; 
    postal: string; 
    calling_code: string; 
    capital: string; 
    borders: string; 
    flag: Flag; 
    connection: Connection; 
    timezone: Timezone; 
};