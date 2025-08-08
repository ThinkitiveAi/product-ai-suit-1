export interface StateRequirement {
  code: string
  name: string
  licenseFormat: string
  licenseExample: string
  requirements: string[]
  renewalPeriod: string
  ceuRequired: number
  boardWebsite: string
}

export const stateRequirements: StateRequirement[] = [
  {
    code: 'AL',
    name: 'Alabama',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 25,
    boardWebsite: 'https://www.albme.org'
  },
  {
    code: 'AK',
    name: 'Alaska',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 50,
    boardWebsite: 'https://www.commerce.alaska.gov/web/cbpl/ProfessionalLicensing/StateMedicalBoard.aspx'
  },
  {
    code: 'AZ',
    name: 'Arizona',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 40,
    boardWebsite: 'https://www.azmd.gov'
  },
  {
    code: 'AR',
    name: 'Arkansas',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 20,
    boardWebsite: 'https://www.armedicalboard.org'
  },
  {
    code: 'CA',
    name: 'California',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance',
      'Additional California-specific requirements'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 50,
    boardWebsite: 'https://www.mbc.ca.gov'
  },
  {
    code: 'CO',
    name: 'Colorado',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 50,
    boardWebsite: 'https://www.colorado.gov/pacific/dora/Medical_Board'
  },
  {
    code: 'CT',
    name: 'Connecticut',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 50,
    boardWebsite: 'https://portal.ct.gov/DPH/Practitioner-Licensing--Investigations/Medical-Practicing-Board'
  },
  {
    code: 'DE',
    name: 'Delaware',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 40,
    boardWebsite: 'https://www.dpr.delaware.gov/boards/medicalpractice'
  },
  {
    code: 'FL',
    name: 'Florida',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance',
      'HIV/AIDS course completion'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 40,
    boardWebsite: 'https://flboardofmedicine.gov'
  },
  {
    code: 'GA',
    name: 'Georgia',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 35,
    boardWebsite: 'https://medicalboard.georgia.gov'
  },
  {
    code: 'HI',
    name: 'Hawaii',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 40,
    boardWebsite: 'https://cca.hawaii.gov/pvl/boards/medicine'
  },
  {
    code: 'ID',
    name: 'Idaho',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 40,
    boardWebsite: 'https://bom.idaho.gov'
  },
  {
    code: 'IL',
    name: 'Illinois',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Triennal',
    ceuRequired: 150,
    boardWebsite: 'https://www.idfpr.com/profs/Medical.asp'
  },
  {
    code: 'IN',
    name: 'Indiana',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 40,
    boardWebsite: 'https://www.in.gov/pla/medical'
  },
  {
    code: 'IA',
    name: 'Iowa',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 40,
    boardWebsite: 'https://medicalboard.iowa.gov'
  },
  {
    code: 'KS',
    name: 'Kansas',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 50,
    boardWebsite: 'https://www.kansas.gov/kbml'
  },
  {
    code: 'KY',
    name: 'Kentucky',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 30,
    boardWebsite: 'https://kbml.ky.gov'
  },
  {
    code: 'LA',
    name: 'Louisiana',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 20,
    boardWebsite: 'https://www.lsbme.la.gov'
  },
  {
    code: 'ME',
    name: 'Maine',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 40,
    boardWebsite: 'https://www.maine.gov/md'
  },
  {
    code: 'MD',
    name: 'Maryland',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 50,
    boardWebsite: 'https://www.mbp.state.md.us'
  },
  {
    code: 'MA',
    name: 'Massachusetts',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 100,
    boardWebsite: 'https://www.mass.gov/orgs/board-of-registration-in-medicine'
  },
  {
    code: 'MI',
    name: 'Michigan',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 25,
    boardWebsite: 'https://www.michigan.gov/lara/0,4601,7-154-72600_72603_27529_27542_27543---,00.html'
  },
  {
    code: 'MN',
    name: 'Minnesota',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 75,
    boardWebsite: 'https://mn.gov/boards/medical-practice'
  },
  {
    code: 'MS',
    name: 'Mississippi',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 40,
    boardWebsite: 'https://www.msbml.ms.gov'
  },
  {
    code: 'MO',
    name: 'Missouri',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 50,
    boardWebsite: 'https://pr.mo.gov/medical.asp'
  },
  {
    code: 'MT',
    name: 'Montana',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 50,
    boardWebsite: 'https://boards.bsd.dli.mt.gov/medical'
  },
  {
    code: 'NE',
    name: 'Nebraska',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 50,
    boardWebsite: 'https://dhhs.ne.gov/Pages/Medical-and-Osteopathic-Physicians-Licensing.aspx'
  },
  {
    code: 'NV',
    name: 'Nevada',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 35,
    boardWebsite: 'https://www.medboard.nv.gov'
  },
  {
    code: 'NH',
    name: 'New Hampshire',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 40,
    boardWebsite: 'https://www.oplc.nh.gov/medical-board'
  },
  {
    code: 'NJ',
    name: 'New Jersey',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 100,
    boardWebsite: 'https://www.njconsumeraffairs.gov/med'
  },
  {
    code: 'NM',
    name: 'New Mexico',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Triennal',
    ceuRequired: 75,
    boardWebsite: 'https://www.nmmb.state.nm.us'
  },
  {
    code: 'NY',
    name: 'New York',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Triennal',
    ceuRequired: 100,
    boardWebsite: 'https://www.op.nysed.gov/professions/physicians'
  },
  {
    code: 'NC',
    name: 'North Carolina',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 60,
    boardWebsite: 'https://www.ncmedboard.org'
  },
  {
    code: 'ND',
    name: 'North Dakota',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 60,
    boardWebsite: 'https://www.ndbom.health.nd.gov'
  },
  {
    code: 'OH',
    name: 'Ohio',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 50,
    boardWebsite: 'https://www.med.ohio.gov'
  },
  {
    code: 'OK',
    name: 'Oklahoma',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 60,
    boardWebsite: 'https://www.okmedicalboard.org'
  },
  {
    code: 'OR',
    name: 'Oregon',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 60,
    boardWebsite: 'https://www.oregon.gov/omb'
  },
  {
    code: 'PA',
    name: 'Pennsylvania',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 100,
    boardWebsite: 'https://www.dos.pa.gov/ProfessionalLicensing/BoardsCommissions/Medicine'
  },
  {
    code: 'RI',
    name: 'Rhode Island',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 40,
    boardWebsite: 'https://health.ri.gov/licenses/detail.php?id=219'
  },
  {
    code: 'SC',
    name: 'South Carolina',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 40,
    boardWebsite: 'https://www.llr.sc.gov/med'
  },
  {
    code: 'SD',
    name: 'South Dakota',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 50,
    boardWebsite: 'https://doh.sd.gov/boards/medical-licensing'
  },
  {
    code: 'TN',
    name: 'Tennessee',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 40,
    boardWebsite: 'https://www.tn.gov/health/health-program-areas/health-professional-boards/medical-board.html'
  },
  {
    code: 'TX',
    name: 'Texas',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 48,
    boardWebsite: 'https://www.tmb.state.tx.us'
  },
  {
    code: 'UT',
    name: 'Utah',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 40,
    boardWebsite: 'https://dopl.utah.gov/med'
  },
  {
    code: 'VT',
    name: 'Vermont',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 30,
    boardWebsite: 'https://www.healthvermont.gov/professionals/medical-practice-board'
  },
  {
    code: 'VA',
    name: 'Virginia',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 60,
    boardWebsite: 'https://www.dhp.virginia.gov/medicine'
  },
  {
    code: 'WA',
    name: 'Washington',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 50,
    boardWebsite: 'https://www.doh.wa.gov/LicensesPermitsandCertificates/ProfessionsNewReneworUpdate/PhysicianandSurgeon'
  },
  {
    code: 'WV',
    name: 'West Virginia',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 50,
    boardWebsite: 'https://wvbom.wv.gov'
  },
  {
    code: 'WI',
    name: 'Wisconsin',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 30,
    boardWebsite: 'https://dsps.wi.gov/Pages/Professions/MedicalExaminingBoard/Default.aspx'
  },
  {
    code: 'WY',
    name: 'Wyoming',
    licenseFormat: 'XXXXX',
    licenseExample: '12345',
    requirements: [
      'Medical degree from accredited institution',
      'Pass USMLE or COMLEX',
      'Complete residency program',
      'Background check',
      'Professional liability insurance'
    ],
    renewalPeriod: 'Biennial',
    ceuRequired: 60,
    boardWebsite: 'https://wsbme.wyo.gov'
  }
]

export const getStateRequirement = (stateCode: string): StateRequirement | undefined => {
  return stateRequirements.find(state => state.code === stateCode.toUpperCase())
}

export const getStateName = (stateCode: string): string => {
  const state = getStateRequirement(stateCode)
  return state?.name || stateCode
}

export const validateLicenseFormat = (license: string, stateCode: string): boolean => {
  const state = getStateRequirement(stateCode)
  if (!state) return false
  
  // Basic validation - in real implementation, this would be more sophisticated
  return license.length >= 5 && license.length <= 20
} 