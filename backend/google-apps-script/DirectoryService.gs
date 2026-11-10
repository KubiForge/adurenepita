/**
 * Directory Service
 * Queries and filters verified care centers from the SupportDirectory Google Sheet tab.
 */

function getVerifiedSupportCenters(filterProvince, filterDistrict) {
  var sheet = getSheetTab('SupportDirectory');
  if (!sheet) return [];

  var data = sheet.getDataRange().getValues();
  var centers = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var centerId = row[0];
    var name = row[1];
    var nameSi = row[2];
    var province = row[3];
    var district = row[4];
    var phone = row[5];
    var address = row[6];
    var hours = row[7];
    var status = row[8];
    var lastVerified = row[9];

    if (filterProvince && province.toLowerCase() !== filterProvince.toLowerCase()) {
      continue;
    }
    if (filterDistrict && district.toLowerCase() !== filterDistrict.toLowerCase()) {
      continue;
    }

    centers.push({
      id: centerId,
      name: name,
      nameSi: nameSi,
      province: province,
      district: district,
      phone: phone,
      address: address,
      operatingHours: hours,
      verificationStatus: status,
      lastVerifiedDate: lastVerified
    });
  }

  return centers;
}
