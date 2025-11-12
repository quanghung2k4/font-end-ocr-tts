export class Admin {
  /**@type {int}*/
  #id;
  /**@type {string} */
  #fullName;
  /**@type {string} */
  #email;
  /**@type {string} */
  #address;
  /**@type {string} */
  #username;
  /**@type {string} */
  #password;

  constructor(id = null, fullName= null, email= null, address = null, username= null, password= null) {
    this.#id = id;
    this.#fullName = fullName;
    this.#email = email;
    this.#address = address;
    this.#username = username;
    this.#password = password;
  }

  getId() { return this.#id; }
  setId(id) { this.#id = id; }

  getFullName() { return this.#fullName; }
  setFullName(name) { this.#fullName = name; }

  getEmail() { return this.#email; }
  setEmail(email) { this.#email = email; }

  getAddress() { return this.#address; }
  setAddress(addr) { this.#address = addr; }

  getUsername() { return this.#username; }
  setUsername(u) { this.#username = u; }

  getPassword() { return this.#password; }
  setPassword(pw) { this.#password = pw; }
}