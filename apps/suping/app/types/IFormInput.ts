export type IFormInput = {
  startDateTime?: Date;
  endDateTime?: Date;
  options: {
    sauna: boolean;
    bbqSet: boolean;
    swimWears: number;
    bathTowels: number;
    crocses: number;
  };
  customer: {
    lastName: string;
    firstName: string;
    email: string;
    phoneNumber: string;
    adultCount: number;
    childCount: number;
    otherInfo?: string;
  };
  discoveryMethods: string[];
  subTotalPrice?: number;
  totalPrice: number;
};
