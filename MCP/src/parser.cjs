
async function cleaning(message) {
    // Remove HTML tags
    message = message.replace(/<[^>]*>/g, '')
    
    // Remove URLs
    message = message.replace(/https?:\/\/\S+|www\.\S+/g, '')
    
    // Remove special characters but keep basic punctuation and spaces
    message = message.replace(/[^\w\s.,!?'-]/g, '')
    
    return message
}

async function preProcess(message) {
  // 1. Preprocessing and cleaning
  if (typeof message !== "string") {
    throw new Error("Message is not a string")
  }

  // 2. Length validation (prevent DoS)
  const MAX_MESSAGE_LENGTH = 10000; 
  if (message.length > MAX_MESSAGE_LENGTH) {
    throw new Error(`Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters`);
  }

  // 3. sanitization -> removes trailing white space
  message = message.trim()

  // 5. protection
  message = message
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
  
  // 6. Normalize whitespace
  message = message.replace(/\s+/g, ' ').trim();
  
  return message
}


// main NLP function
async function NLP(message) {
    if (!message) {
        throw new Error("Message is required for NLP processing")
    }

    // clean message
    const cleanedMessage = await cleaning(message)

    // pre process message
    const parsedMessage = await preProcess(cleanedMessage)


    return { parsedMessage }







}

module.exports = { NLP }