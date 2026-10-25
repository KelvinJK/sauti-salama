// Development builds also list unreviewed articles (always behind a warning banner) so screens can be
// built before real content exists. Release builds only ever show publishable articles.
export const contentPolicy = {
  showUnreviewed: __DEV__,
};
