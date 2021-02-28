// Imports the Google Cloud client library
import googleTranslate from "@google-cloud/translate";

const { Translate } = googleTranslate.v2;

// Creates a client
const translate = new Translate();
/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */

export async function translateText(text, target) {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  // translations.forEach((translation, i) => {
  // 	console.log(`${text[i]} => (${target}) ${translation}`);
  // });
  return translations;
}

// translateText(text, target);
