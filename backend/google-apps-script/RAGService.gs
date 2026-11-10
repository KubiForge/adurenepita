/**
 * Retrieval-Augmented Generation (RAG) Service
 * Retrieves approved substance monographs and verified service details from Google Sheets.
 */

function retrieveKnowledgeForQuery(query) {
  var lower = query.toLowerCase();
  var sources = [];
  var contextText = "";
  var fallbackAnswer = "";

  var sheet = getSheetTab('DrugKnowledge');
  if (!sheet) {
    return { contextText: "General drug education repository.", sources: [] };
  }

  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    return { contextText: "General drug education repository.", sources: [] };
  }

  // Iterate through approved rows
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var status = row[2]; // ReviewStatus
    if (status !== 'approved') continue;

    var name = (row[0] || '').toString();
    var nameSi = (row[1] || '').toString();
    var classification = (row[3] || '').toString();
    var description = (row[4] || '').toString();
    var shortTerm = (row[5] || '').toString();
    var emergencySigns = (row[6] || '').toString();
    var treatment = (row[7] || '').toString();
    var sourceTitle = (row[8] || '').toString();
    var sourceUrl = (row[9] || '').toString();

    if (
      lower.indexOf(name.toLowerCase()) !== -1 ||
      lower.indexOf(nameSi) !== -1 ||
      lower.indexOf(classification.toLowerCase()) !== -1
    ) {
      contextText += "SUBSTANCE: " + name + " (" + nameSi + ")\n";
      contextText += "Classification: " + classification + "\n";
      contextText += "Description: " + description + "\n";
      contextText += "Short-Term Effects: " + shortTerm + "\n";
      contextText += "Emergency Signs: " + emergencySigns + "\n";
      contextText += "Evidence Treatment: " + treatment + "\n\n";

      sources.push({
        id: 'src-' + i,
        title: sourceTitle || (name + ' Monograph'),
        organization: 'Verified Institutional Monograph',
        url: sourceUrl || 'https://nddcb.gov.lk'
      });

      fallbackAnswer = "Evidence regarding " + name + " (" + nameSi + "):\n\n" +
        "• Classification: " + classification + "\n" +
        "• Effects: " + shortTerm + "\n" +
        "• Emergency Signs: " + emergencySigns + "\n" +
        "• Treatment Pathway: " + treatment;
    }
  }

  return {
    contextText: contextText || "Beyond the Darkness general educational context.",
    sources: sources,
    fallbackAnswer: fallbackAnswer
  };
}

function getApprovedDrugKnowledge() {
  var sheet = getSheetTab('DrugKnowledge');
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  var results = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (row[2] === 'approved') {
      results.push({
        name: row[0],
        nameSi: row[1],
        status: row[2],
        classification: row[3],
        description: row[4],
        sourceTitle: row[8],
        sourceUrl: row[9]
      });
    }
  }
  return results;
}
