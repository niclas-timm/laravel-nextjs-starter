/*
|--------------------------------------------------------------------------
| User validation.
|--------------------------------------------------------------------------
|
| Validate the input of a user upon her login or registration.
|
*/
import validator from "validator";

export class UserValidator {
    /**
     *
     * @param {string} name
     *   The name of the new user.
     * @param {string} email
     *   The email of the new user.
     * @param {string} password
     *   The password of the new user.
     * @param {string} passwordConfirmed
     *   The password confirmation.
     * @param {number} minPassChars
     *   The minimum number of characters the password must have.
     *
     * @return {boolean}
     *   True if validation was successful.
     */
    public validateRegistrationInput(
        name: string,
        email: string,
        password: string,
        passwordConfirmed: string,
        minPassChars: number
    ): { name: string; email: string; password: string } | boolean {
        let errorDetected = false;
        const errors = {
            name: "",
            password: "",
            email: "",
        };
        // Check name.
        const isNameValid = this.validateName(name);
        if (!isNameValid) {
            errors.name = "The name may only contain letters.";
            errorDetected = true;
        }

        // Check password.
        const isPasswordValid = this.validatePassword(
            password,
            passwordConfirmed,
            minPassChars
        );
        if (!isPasswordValid) {
            errors.password =
                "The password must be at least 8 characters long.";
            errorDetected = true;
        }

        // Check email.
        const isEmailValid = this.validateEmail(email);
        if (!isEmailValid) {
            errors.email = "Please provide a valid email address.";
            errorDetected = true;
        }

        // Return true if everythin is valid.
        if (!errorDetected) {
            return true;
        }
        return errors;
    }

    /**
     * Check if the name of the user only contains letters.
     *
     * @param {string} name
     *   The name of the user.
     */
    public validateName(name: string): boolean {
        // Removes spaces as validator does not count them as letters.
        const tmp = name.replace(" ", "");
        return validator.isAlpha(tmp);
    }

    /**
     * Confirm the users password when registering.
     *
     * @param {string} password
     *   The password.
     * @param {string} passwordConfirmed
     *   The password confirmation.
     * @param {number} minPasswordLength
     *   The minimum password length.
     *
     * @return {boolean}
     *   True if validation was successful.
     */
    public validatePassword(
        password: string,
        passwordConfirmed: string,
        minPasswordLength: number
    ): boolean {
        // Check password length:
        if (password.length < minPasswordLength) {
            return false;
        }

        // Check that password it not too soft:
        if (password.includes("passwor") || password.includes("123456")) {
            return false;
        }

        // Passwords must be equal.
        if (password !== passwordConfirmed) {
            return false;
        }

        // Return true if everything is fine.
        return true;
    }

    /**
     * Check if the user gave a valid email address.
     *
     * @param {string} email
     *   The email that is validated.
     *
     * @return {boolean}
     *   True if email is valid.
     */
    public validateEmail(email: string): boolean {
        // Let the validator package handle the big lifting.
        if (!validator.isEmail(email)) {
            return false;
        }

        // List of strings within the mail that are suspicious.
        const blacklist = ["@example", "@email"];

        // Check that none of the blacklist strings is in the mail address.
        const noFraudDetected = blacklist.every((item) => {
            return !email.includes(item);
        });

        if (!noFraudDetected) {
            return false;
        }

        return true;
    }
}
