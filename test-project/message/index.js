module.exports = params => ({
  "@context": "https://schema.org/extensions",
  "@type": "MessageCard",
  "themeColor": "11aaff",
  "title": params.title,
  "text": params.text
});
