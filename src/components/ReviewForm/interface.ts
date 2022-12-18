import { IReview } from "../../models/IReview";

export type ReviewFormInputs = {
  title: string;
  artItem: string;
  category: string;
  text: string;
  tags: string[];
  image?: string;
};

export interface ReviewFormProps {
  isEdit?: boolean;
  review?: IReview;
}
