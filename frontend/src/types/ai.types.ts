export interface ExplainRequest {
  text: string;
  context: string; // paragraf di sekitar teks yang dipilih
  bookId: string;
  language: "id" | "en";
}

export interface ExplainResponse {
  explanation: string;
  wordDefinition?: string;
  partOfSpeech?: string;
  examples: string[];
  relatedTerms?: string[];
}

export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  firstSeenAt: string;
  traits: string[];
  relations: CharacterRelation[];
}

export interface CharacterRelation {
  characterId: string;
  name: string;
  type: string;
}
