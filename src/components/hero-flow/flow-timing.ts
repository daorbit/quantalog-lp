export const PACKET_START = 1.8;
export const PACKET_CYCLE_S = 3;
export const PACKET_CYCLE_MS = PACKET_CYCLE_S * 1000;
export const PACKET_ARRIVAL_MS = (PACKET_START + PACKET_CYCLE_S * 0.64) * 1000;
