import { AuthChecker } from 'type-graphql';
import { GraphqlContext } from './graphql.context';

// create auth checker function
export const authChecker: AuthChecker<GraphqlContext> = (
  { context: { user } },
  roles
) => {
  if (roles.length === 0) {
    // if `@Authorized()`, check only if user exists
    return user !== undefined;
  }
  // there are some roles defined now

  if (!user) {
    // and if no user, restrict access
    return false;
  }

  // no roles matched, restrict access
  return false;
};
