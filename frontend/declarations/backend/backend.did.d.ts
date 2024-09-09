import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Job {
  'id' : string,
  'name' : string,
  'role' : string,
  'image' : [] | [string],
}
export interface JobDetail {
  'id' : string,
  'weaknesses' : [] | [Array<string>],
  'strengths' : Array<string>,
  'name' : string,
  'role' : string,
  'image' : [] | [string],
}
export interface _SERVICE {
  'getJobDetails' : ActorMethod<[string], [] | [JobDetail]>,
  'getJobs' : ActorMethod<[], Array<Job>>,
  'initializeJobs' : ActorMethod<[], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
