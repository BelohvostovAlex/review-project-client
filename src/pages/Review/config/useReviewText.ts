import { useTranslation } from "react-i18next";

export const useReviewText = () => {
  const { t } = useTranslation();

  return {
    commentTitle: t("Comment.title"),
    commentSend: t("Comment.send"),
    comments: t("Comment.comments"),
    relatedReviews: t("RelatedReviews.title"),
  };
};
