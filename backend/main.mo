import Hash "mo:base/Hash";
import Iter "mo:base/Iter";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Option "mo:base/Option";
import Debug "mo:base/Debug";

actor {
  // Types
  type Job = {
    id: Text;
    name: Text;
    role: Text;
    image: ?Text;
  };

  type JobDetail = {
    id: Text;
    name: Text;
    role: Text;
    image: ?Text;
    strengths: [Text];
    weaknesses: ?[Text];
  };

  // Stable variables
  stable var jobsArray: [Job] = [];
  stable var jobDetailsEntries: [(Text, JobDetail)] = [];

  // Initialize HashMap from stable variable
  var jobDetails = HashMap.fromIter<Text, JobDetail>(jobDetailsEntries.vals(), 0, Text.equal, Text.hash);

  // Helper function to create a job
  func createJob(id: Text, name: Text, role: Text, image: ?Text): Job {
    {
      id;
      name;
      role;
      image;
    }
  };

  // Helper function to create job details
  func createJobDetail(id: Text, name: Text, role: Text, image: ?Text, strengths: [Text], weaknesses: ?[Text]): JobDetail {
    {
      id;
      name;
      role;
      image;
      strengths;
      weaknesses;
    }
  };

  // Initialize jobs and job details
  public func initializeJobs() {
    jobsArray := [
      createJob("PLD", "Paladin", "Tank", ?"paladin.png"),
      createJob("WHM", "White Mage", "Healer", ?"whitemage.png"),
      createJob("BLM", "Black Mage", "DPS", ?"blackmage.png")
    ];

    jobDetails.put("PLD", createJobDetail(
      "PLD",
      "Paladin",
      "Tank",
      ?"paladin.png",
      ["Strong defensive abilities", "Party-wide protection"],
      ?["Lower damage output compared to other tanks"]
    ));

    jobDetails.put("WHM", createJobDetail(
      "WHM",
      "White Mage",
      "Healer",
      ?"whitemage.png",
      ["Powerful healing spells", "Good damage potential for a healer"],
      ?["Limited mobility"]
    ));

    jobDetails.put("BLM", createJobDetail(
      "BLM",
      "Black Mage",
      "DPS",
      ?"blackmage.png",
      ["High magical damage output", "Powerful area of effect spells"],
      ?["Low mobility", "Fragile"]
    ));
  };

  // Get all jobs
  public query func getJobs(): async [Job] {
    jobsArray
  };

  // Get job details
  public query func getJobDetails(jobId: Text): async ?JobDetail {
    jobDetails.get(jobId)
  };

  // System functions for upgrades
  system func preupgrade() {
    jobDetailsEntries := Iter.toArray(jobDetails.entries());
  };

  system func postupgrade() {
    jobDetails := HashMap.fromIter<Text, JobDetail>(jobDetailsEntries.vals(), 0, Text.equal, Text.hash);
  };
}
