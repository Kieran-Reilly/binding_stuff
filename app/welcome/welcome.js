export default class Welcome extends crs.classes.BindableElement {
    get html() {
        return import.meta.url.replace(".js", ".html");
    }

    get shadowDom() {
        return true;
    }

    async preLoad() {
        await this.reset();

        await crs.binding.translations.add({
            firstName: "First Name",
            lastName: "Last Name",
            age: "Age",
            reset: "Reset",
            displayName: "Display Name",
        }, 'en')
    }

    async reset() {
        await this.setProperty("firstName", "");
        await this.setProperty("lastName", "");
        await this.setProperty("age", "");
    }
}