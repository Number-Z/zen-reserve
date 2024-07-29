export type IFormInput = {
  startDateTime?: Date;
  endDateTime?: Date;
  options: {
    tentSetup: boolean;
    firewood: boolean;
    saunaOil: boolean;
    bbqSet: boolean;
    additionalChairs: number;
    swimWears: number;
    bathTowels: number;
    crocses: number;
    saunaHats: number;
  };
  customer: {
    lastName: string;
    firstName: string;
    email: string;
    phoneNumber: string;
    adultCount: number;
    otherInfo?: string;
  };
  discoveryMethods: string[];
  totalPrice: number;
};
