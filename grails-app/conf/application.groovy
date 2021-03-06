

// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'nquire.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'nquire.UserRole'
grails.plugin.springsecurity.authority.className = 'nquire.Role'
grails.plugin.springsecurity.controllerAnnotations.staticRules = [
	[pattern: '/',               access: ['permitAll']],
	[pattern: '/error',          access: ['permitAll']],
	[pattern: '/lecturer',       access: ['permitAll']],
	[pattern: '/user/register',  access: ['permitAll']],
	[pattern: '/assets/**',      access: ['permitAll']],
	[pattern: '/**/js/**',       access: ['permitAll']],
	[pattern: '/**/css/**',      access: ['permitAll']],
	[pattern: '/**/images/**',   access: ['permitAll']],
	[pattern: '/**/favicon.ico', access: ['permitAll']]
]

grails.plugin.springsecurity.filterChain.chainMap = [
	[pattern: '/assets/**',      filters: 'none'],
	[pattern: '/**/js/**',       filters: 'none'],
	[pattern: '/**/css/**',      filters: 'none'],
	[pattern: '/**/images/**',   filters: 'none'],
	[pattern: '/**/favicon.ico', filters: 'none'],
	[pattern: '/**',             filters: 'JOINED_FILTERS']
]

rememberMe.cookieName = 'nquire_remember_me'
rememberMe.key = "jkl893ajgah80" // Set custom cookie salting key for security

grails.plugin.springsecurity.password.algorithm = 'bcrypt' // Set password hashing algorithm to bcrypt for security
grails.plugin.springsecurity.rejectIfNoRule = false // Disable pessimistic lockdown
grails.plugin.springsecurity.fii.rejectPublicInvocations = false

grails.plugin.springsecurity.successHandler.defaultTargetUrl = "/lecturer" // Set default redirect url to lecturer home