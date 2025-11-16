const re = reuqire('re')


async function cleaning(message) {
    message.encode('utf-8') // gets rid of symbols, emojis, graphic characters, or special characters

    // remove HTML TAG
    html = re.compile('[<,#*?>]')
    message = html.sub(r,'',message)

    // Remove urls:
    url = re.compile('https?://\S+|www\.S+')
    message = url.sub(r, '',message)

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
  let message = message.trim()

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
        return res.status(400).json({ error: "error w message NLP"})
    }

    // clean message
    const cleanedMessage = await cleaning(message)

    // pre process message
    const preProcessedMessage = await preProcess(cleanedMessage)







}

modules.export = { NLP }