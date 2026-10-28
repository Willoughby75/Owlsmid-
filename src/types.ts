export type Category = 'tsmid' | 'tasmid' | 'asmid' | 'bsmid' | 'minibsmid';

export interface RegData {
  category: Category | '';
  verificationMethod: string;
  name: string;
  petName: string;
  parentName: string;
  parentPetName: string;
  teenName: string;
  teenAge: string;
  businessName: string;
  dob: string;
  country: string;
  phone: string;
  email: string;
  faceVerified: boolean;
  face2Verified: boolean;
  mapAccess: string[];
  emailAccess: string[];
  accessCode: string;
  paymentMethod: string;
  termsAccepted: boolean;
}

export interface User {
  name: string;
  email: string;
  id: string;
}

export interface CloudFile {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  icon: string;
}

export interface ActivityLog {
  id: string;
  icon: string;
  title: string;
  description: string;
  time: string;
  color: string;
}
