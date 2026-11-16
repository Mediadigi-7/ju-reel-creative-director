import assert from 'node:assert/strict';
import { JOY_UNIVERSITY_COURSES, PROPOSED_UG_PROGRAMMES_2027_28 as proposal, proposedProgrammeContext } from '../shared/knowledgeBase.js';
import { SYSTEM_PROMPT } from './aiService.js';
assert.equal(proposal.status, 'proposed');
assert.equal(proposal.academicYear, '2027–28');
assert.equal(proposal.schools.length, 9);
assert.deepEqual(proposal.schools.map(s => s.programmes.length), [6, 3, 0, 4, 0, 0, 0, 0, 3]);
const programmes = proposal.schools.flatMap(s => [...s.programmes]);
assert.equal(programmes.length, 16);
assert.equal(new Set(programmes).size, 16);
for (const name of programmes) {
  assert.ok(SYSTEM_PROMPT.includes('- Proposed for 2027–28: ' + name));
}
const context = proposedProgrammeContext();
assert.match(context, /NOT confirmed offerings/);
assert.match(context, /not that the school has no existing courses/);
assert.match(context, /VERIFICATION REQUIRED/);
assert.match(context, /Do not claim approval/);
assert.equal(proposal.schools[8].programmes[2], 'B.A./B.Sc. Digital Media, Artificial Intelligence & Communication');
console.log('PASS: all 16 exact names, nine school classifications, proposal status and generation context');

const mappings = [
  ['computationalIntelligence', 0], ['engineeringAndTechnology', 1],
  ['managementAndCommerce', 3], ['appliedSciencesAndMedia', 8],
] as const;
let additions = 0;
for (const [group, index] of mappings) {
  const names = JOY_UNIVERSITY_COURSES[group];
  for (const name of proposal.schools[index].programmes) {
    assert.equal(names.filter(item => item === `${name} — Proposed for 2027–28`).length, 1);
    additions++;
  }
}
assert.equal(additions, 16);
assert.ok(JOY_UNIVERSITY_COURSES.computationalIntelligence.includes('B.Tech CSE (AI & Robotics)'));
assert.ok(JOY_UNIVERSITY_COURSES.managementAndCommerce.includes('B.Com (Accounting & Finance)'));
assert.equal(JOY_UNIVERSITY_COURSES.agriculture.length, 3);
assert.equal(JOY_UNIVERSITY_COURSES.law.length, 3);
assert.equal(JOY_UNIVERSITY_COURSES.healthAndMedicalSciences.length, 7);
console.log('PASS: all 16 additions merged into existing groups with proposal labels; older programmes retained');
