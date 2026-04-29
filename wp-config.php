<?php
define( 'WP_CACHE', true );

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u516302115_cIWbW' );

/** Database username */
define( 'DB_USER', 'u516302115_IsYfU' );

/** Database password */
define( 'DB_PASSWORD', 'tTh9W0d45f' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'baHen;F4sp~cQdL$>Ka`u!m<^oT>&!J6/PK{<b{W2%dvu>u?g+8|wb?Uq>ns-]sy' );
define( 'SECURE_AUTH_KEY',   '1S4*ACq5$V,vZFIa<ygHA8I8#*O%B?MXSm(*K/E;.Hi(w4A!E8>tz7]hC3jYA1qS' );
define( 'LOGGED_IN_KEY',     't$>}r##{4FY<_&=^jQo?2n/NpIJqp!E8_~$cN2J/>OB$k<a8^AMA&S-TXV6}P0y#' );
define( 'NONCE_KEY',         '/ES]7Kx{am[C,H/,<Vw)5G)@bfm+szu!^W/MbEG]cT:s(xL-;@H$+[[@%|2SVxz,' );
define( 'AUTH_SALT',         'YO|0Svwsp4U_`{~alyJCAadyN)6X^`l}Kpgkcw* J*xvd|U|N<RBEY$a]NW~Dmf_' );
define( 'SECURE_AUTH_SALT',  'O5TuZa/-y 05Wp&&9<zI`Uu;u<z2f)$#3a!Paq5g`_bR-`)Z[d0f/@h2#*r`PmNi' );
define( 'LOGGED_IN_SALT',    ';quhTatSK?+r+K8 qJCEs1bA,;mY&`S>LB~F#zp_S<2@6W<NYK,&+zF#hFFK4/n)' );
define( 'NONCE_SALT',        'U-l2>WP&fX7kH={fVmL[Cf73V;ax|tqmE,ejJ6JbJK$vTA*0hGH^G*h O+MoY[1[' );
define( 'WP_CACHE_KEY_SALT', '7 j.1,4f;dDM,AVXE5 Q|c2Cy9pm1+V?-vY)I1PHv=s(;dNKnVUP}nlW)@}7tEg#' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'FS_METHOD', 'direct' );
define( 'COOKIEHASH', '9a8584b7504150ccd4fb2c92b0f5fdbe' );
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
