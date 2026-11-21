import { detectEmergency } from '../src/services/emergencyDetector';
import handler from '../api/chat';

function createMockReqRes(body: any) {
  const req: any = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': '127.0.0.1',
    },
    body,
  };

  let statusCode = 200;
  let responseData: any = null;

  const res: any = {
    setHeader() {},
    status(code: number) {
      statusCode = code;
      return res;
    },
    json(data: any) {
      responseData = data;
      return res;
    },
    end(str?: string) {
      if (str && !responseData) {
        try {
          responseData = JSON.parse(str);
        } catch {
          responseData = str;
        }
      }
    },
    getStatusCode: () => statusCode,
    getData: () => responseData,
  };

  return { req, res };
}

const MANDATORY_TESTS = [
  { id: 1, text: 'මචන් මගේ යාලුවට සිහිය නැ', expectedEmergency: true },
  { id: 2, text: 'My friend is unconscious', expectedEmergency: true },
  { id: 3, text: 'eya husma ganne na', expectedEmergency: true },
  { id: 4, text: 'My friend took too many pills', expectedEmergency: true },
  { id: 5, text: 'මට හුස්ම ගන්න බෑ', expectedEmergency: true },
  { id: 6, text: 'He is having a seizure', expectedEmergency: true },
  // Additional variations mentioned in prompt
  { id: 7, text: 'eya unconscious', expectedEmergency: true },
  { id: 8, text: 'friend is not responding', expectedEmergency: true },
  { id: 9, text: 'he is not breathing', expectedEmergency: true },
  { id: 10, text: 'මගේ යාලුවා වැටිලා සිහිය නෑ', expectedEmergency: true },
  { id: 11, text: 'drug overdose wela', expectedEmergency: true },
  { id: 12, text: 'fits enawa', expectedEmergency: true },
  // Normal non-emergency questions
  { id: 13, text: 'How can I support a friend who wants to stop smoking cannabis?', expectedEmergency: false },
  { id: 14, text: 'What are the main rehabilitation pathways in Sri Lanka?', expectedEmergency: false },
];

async function runEmergencyTests() {
  console.log('================================================================');
  console.log('AASHI DETERMINISTIC EMERGENCY DETECTION TEST SUITE');
  console.log('================================================================\n');

  let passedCount = 0;
  let failedCount = 0;

  for (const t of MANDATORY_TESTS) {
    console.log(`[TEST #${t.id}] Input: "${t.text}"`);

    // 1. Test deterministic emergency detector unit
    const directResult = detectEmergency(t.text);
    const directOk = directResult.isEmergency === t.expectedEmergency;

    // 2. Test serverless /api/chat endpoint override
    const { req, res } = createMockReqRes({ message: t.text });
    await handler(req, res);
    const apiData = res.getData();
    const apiEmergency = Boolean(apiData?.emergency);
    const apiOk = apiEmergency === t.expectedEmergency;

    if (directOk && apiOk) {
      console.log(`  -> DETECTOR: PASS (isEmergency=${directResult.isEmergency}, level=${directResult.level})`);
      console.log(`  -> API ROUTE: PASS (emergency=${apiEmergency}, status=${res.getStatusCode()})`);
      if (t.expectedEmergency) {
        console.log(`  -> CALL 1990 DETECTED: ${apiData?.emergencyData?.emergencyNumber === '1990'}`);
        console.log(`  -> GUIDANCE TITLE: ${apiData?.emergencyData?.title}`);
      }
      passedCount++;
    } else {
      console.error(`  -> FAILED! Expected emergency=${t.expectedEmergency}`);
      console.error(`     Detector result: ${directResult.isEmergency}`);
      console.error(`     API result: ${apiEmergency}`);
      failedCount++;
    }
    console.log('----------------------------------------------------------------');
  }

  console.log(`\nTEST RESULTS SUMMARY:`);
  console.log(`TOTAL: ${MANDATORY_TESTS.length}`);
  console.log(`PASSED: ${passedCount}`);
  console.log(`FAILED: ${failedCount}`);

  if (failedCount > 0) {
    process.exit(1);
  }
}

runEmergencyTests().catch((err) => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
