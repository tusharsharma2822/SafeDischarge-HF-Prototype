import { getCachedGuidelines } from "./guideline.service.js";
import { getTopK } from "./vector.service.js";

export const retrieveRelevantChunks = async (patientData) => {
  const queryText = JSON.stringify(patientData);
  const guidelines = getCachedGuidelines();

  const topChunks = getTopK(queryText, guidelines, 3);

  return topChunks;
};