import { NextResponse } from 'next/server';

// University domains returned by the HIBP "subscribeddomains" endpoint
const domains: string[] = [
  'aau.dk',
  'adm.aau.dk',
  'adm.ku.dk',
  'cbs.dk',
  'cert.dk',
  'deic.dk',
  'dtu.dk',
  'edu.kglakademi.dk',
  'its.aau.dk',
  'itu.dk',
  'kglakademi.dk',
  'nbi.dk',
  'nbi.ku.dk',
  'ruc.dk',
  'srv.aau.dk',
  'student.aau.dk',
];

export async function GET() {
  return NextResponse.json(domains);
}
