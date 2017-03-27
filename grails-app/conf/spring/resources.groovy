import nquire.MyUserDetailsService;

// Place your Spring DSL code here
beans = {
    userDetailsService(MyUserDetailsService);

    localeResolver(org.springframework.web.servlet.i18n.SessionLocaleResolver) {
        defaultLocale = new Locale("en","GB")
        java.util.Locale.setDefault(defaultLocale)
    }
}
