/** User-provided proposal classification; not a confirmation of programme approval or availability. */
export const PROPOSED_UG_PROGRAMMES_2027_28 = {
  academicYear: '2027–28',
  status: 'proposed',
  source: 'User-provided consolidated school-wise classification',
  schools: [
    { name: 'School of Computational Intelligence', programmes: [
      'B.Tech. Artificial Intelligence & Intelligent Systems',
      'B.Tech. Quantum Computing & Artificial Intelligence',
      'B.Sc. Data Science, AI & Applied Statistics',
      'B.Sc. Artificial Intelligence, Psychology & Cognitive Science',
      'B.Tech. Robotics, AI & Autonomous Systems',
      'B.Tech. Artificial Intelligence & Healthcare Technology',
    ] },
    { name: 'School of Engineering & Technology', programmes: [
      'B.Tech. Semiconductor Technology & VLSI Engineering',
      'B.Tech. Cybersecurity, Digital Forensics & Cyber Intelligence',
      'B.Tech. Electric Vehicle Technology & Smart Energy Systems',
    ] },
    { name: 'School of Agricultural Sciences', programmes: [], note: 'No proposed UG programme directly aligned with this school.' },
    { name: 'School of Entrepreneurship & Management', programmes: [
      'BBA – Artificial Intelligence, Business Analytics & Digital Transformation',
      'BBA – FinTech, AI & Digital Finance',
      'BBA – Healthcare Management & Digital Health',
      'BBA – Entrepreneurship, Innovation & Venture Creation',
    ] },
    { name: 'School of Law', programmes: [], note: 'No proposed UG programme.' },
    { name: 'School of Nursing', programmes: [], note: 'No proposed UG programme.' },
    { name: 'School of Pharmacy', programmes: [], note: 'No proposed UG programme.' },
    { name: 'School of Life & Health Sciences', programmes: [], note: 'No proposed UG programme directly aligned with this school.' },
    { name: 'School of Arts & Natural Sciences', programmes: [
      'B.Sc. Environmental Science, Climate & Sustainability',
      'B.Sc. Physics & Semiconductor Technology',
      'B.A./B.Sc. Digital Media, Artificial Intelligence & Communication',
    ] },
  ],
} as const;

export function proposedProgrammeContext(): string {
  return [
    'PROPOSED UG PROGRAMMES — 2027–28 (user-provided proposal; NOT confirmed offerings)',
    'Keep exact programme names and school classifications. Whenever mentioning one, explicitly describe it as proposed for 2027–28.',
    'Do not claim approval, launch, open admissions, fees, eligibility, placements, facilities, curriculum details, or guaranteed outcomes from this list.',
    'Empty school entries mean no programme in THIS PROPOSAL, not that the school has no existing courses.',
    'Do not replace a named proposed programme with a similarly named course from the older repository catalogue. Unconfirmed availability or other details: VERIFICATION REQUIRED.',
    ...PROPOSED_UG_PROGRAMMES_2027_28.schools.flatMap(school => [
      school.name + ':',
      ...school.programmes.map(name => '- Proposed for 2027–28: ' + name),
      ...(school.programmes.length === 0 ? ['- No programme in this proposal.'] : []),
    ]),
  ].join('\n');
}
