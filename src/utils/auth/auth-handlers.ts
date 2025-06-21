import "./jwt/jwt-strategy";
import "./providers/local/local-strategy";
import "./providers/google/google-strategy";
import "./providers/github/github-strategy";

import { User as myUser } from "../../api/user/user.entity";

declare global {
  namespace Express {
    interface User extends myUser {}
  }
}
