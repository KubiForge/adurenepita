/**
 * Safety & Clinical Governance Engine
 * Evaluates conversations for emergency danger, self-harm, severe toxicity, and medical boundaries.
 */

function evaluateSafety(messageText) {
  if (!messageText) return { level: 1 };
  var text = messageText.toLowerCase();

  // LEVEL 4: Immediate Crisis, Imminent Self-Harm, or Suicide
  var level4Triggers = [
    'suicide', 'kill myself', 'end my life', 'want to die', 'hang myself', 'slit my wrist',
    'දිවි නසා', 'මැරෙන්න', 'මැරෙනවා', 'ජීවිතේ එපා', 'ජීවත් වෙන්න බෑ', 'මැරෙන්න හිතෙනවා',
    'தற்கொலை', 'சாக வேண்டும்', 'வாழ விருப்பமில்லை', 'என்னை அழிக்க'
  ];
  for (var i = 0; i < level4Triggers.length; i++) {
    if (text.indexOf(level4Triggers[i]) !== -1) {
      return {
        level: 4,
        reason: 'Immediate crisis or self-harm intention detected.',
        triggerTerm: level4Triggers[i]
      };
    }
  }

  // LEVEL 3: Urgent Medical Hazard, Overdose, Seizures, Unconsciousness, Respiratory Collapse
  var level3Triggers = [
    'overdose', "can't breathe", 'cannot breathe', 'unconscious', 'passed out', 'seizure', 'convulsion',
    'chest pain', 'lips blue', 'turning blue', 'vomiting blood',
    'අධික මාත්‍රාව', 'හුස්ම ගන්න බෑ', 'සිහිය නෑ', 'සිහිසුන්', 'වලිප්පුව', 'පපුවේ තද කැක්කුම', 'තොල් නිල්', 'ලේ වමනය',
    'சுவாசிக்க முடியவில்லை', 'மயக்கம்', 'நெஞ்சு வலி', 'வலிப்பு', 'நீல நிற உதடுகள்'
  ];
  for (var j = 0; j < level3Triggers.length; j++) {
    if (text.indexOf(level3Triggers[j]) !== -1) {
      return {
        level: 3,
        reason: 'Acute medical toxicity or overdose warning indicators detected.',
        triggerTerm: level3Triggers[j]
      };
    }
  }

  // LEVEL 2: Personal Recovery, Severe Dependence, Withdrawal Anxiety
  var level2Triggers = [
    'cravings', 'withdrawal', 'addicted', 'want to stop', 'hooked', 'relapse', 'cold turkey',
    'නවත්වන්න ඕන', 'ඇබ්බැහි', 'නැවැත්තුවම අමාරුයි', 'වෙව්ලනවා', 'බයයි',
    'நிறுத்த வேண்டும்', 'அடிமையாகிவிட்டேன்'
  ];
  for (var k = 0; k < level2Triggers.length; k++) {
    if (text.indexOf(level2Triggers[k]) !== -1) {
      return {
        level: 2,
        reason: 'Personal recovery support concern disclosed.'
      };
    }
  }

  return { level: 1 };
}

/**
 * Checks for illicit drug manufacturing / acquisition facilitation prompts
 */
function isHarmfulFacilitationPrompt(text) {
  var lower = text.toLowerCase();
  var harmfulPhrases = [
    'how to make ice', 'how to cook meth', 'how to buy heroin', 'where to find drugs in colombo',
    'how to pass drug test with ice', 'how to inject', 'how to smuggle'
  ];
  for (var i = 0; i < harmfulPhrases.length; i++) {
    if (lower.indexOf(harmfulPhrases[i]) !== -1) {
      return true;
    }
  }
  return false;
}
