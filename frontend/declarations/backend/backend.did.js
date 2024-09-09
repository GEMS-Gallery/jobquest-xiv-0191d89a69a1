export const idlFactory = ({ IDL }) => {
  const JobDetail = IDL.Record({
    'id' : IDL.Text,
    'weaknesses' : IDL.Opt(IDL.Vec(IDL.Text)),
    'strengths' : IDL.Vec(IDL.Text),
    'name' : IDL.Text,
    'role' : IDL.Text,
    'image' : IDL.Opt(IDL.Text),
  });
  const Job = IDL.Record({
    'id' : IDL.Text,
    'name' : IDL.Text,
    'role' : IDL.Text,
    'image' : IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    'getJobDetails' : IDL.Func([IDL.Text], [IDL.Opt(JobDetail)], ['query']),
    'getJobs' : IDL.Func([], [IDL.Vec(Job)], ['query']),
    'initializeJobs' : IDL.Func([], [], ['oneway']),
  });
};
export const init = ({ IDL }) => { return []; };
