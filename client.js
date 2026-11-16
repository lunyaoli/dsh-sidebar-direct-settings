window.__ModuleLoader__.load({
  id: 'dsh-sidebar-direct-settings',
  factory(require) {
    const React = require('react');
    const primitives = require('@deepseek-ai/dsh-client-ui-primitives');
    const h = React.createElement;
    const NS = 'dsh-sidebar-direct-settings';
    const SettingsIcon = primitives.IconSettingsOutlineMedium;

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        let translate = () => '\u8bbe\u7f6e';
        try {
          ctx.locale.register(NS, {
            en: { label: 'Settings' },
            zh: { label: '\u8bbe\u7f6e' },
            ja: { label: '\u8a2d\u5b9a' },
            de: { label: 'Einstellungen' },
            es: { label: 'Ajustes' },
            fr: { label: 'Param\u00e8tres' },
            pt: { label: 'Configura\u00e7\u00f5es' },
            ru: { label: '\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438' },
          });
          translate = ctx.locale.bind(NS);
        } catch (error) {
          // Fall back to the default label if the locale service is unavailable.
        }

        function SettingsButton(props) {
          const label = translate('label');
          const wide = !(props && props.wide === false);
          const [hover, setHover] = React.useState(false);
          const openSettings = props && typeof props.openSettings === 'function' ? props.openSettings : undefined;

          const buttonStyle = {
            width: wide ? '100%' : '36px',
            height: wide ? '42px' : '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: wide ? 'flex-start' : 'center',
            gap: wide ? '8px' : '0px',
            padding: wide ? '0 calc(var(--dsh-sidebar-row-padding, 12px) - var(--dsh-sidebar-paint-inset, 0px))' : '0',
            boxSizing: 'border-box',
            border: 'none',
            borderInline: wide ? 'var(--dsh-sidebar-paint-inset, 0px) solid transparent' : '0',
            borderRadius: 'var(--dsw-radius-md)',
            background: hover ? 'var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,0.12))' : 'transparent',
            backgroundClip: wide ? undefined : 'border-box',
            color: 'var(--dsw-alias-label-primary)',
            font: 'inherit',
            fontSize: '14px',
            lineHeight: '22px',
            cursor: 'pointer',
            overflow: 'hidden',
          };

          return h('div', { style: { flex: wide ? '1 1 auto' : 'none', width: wide ? 'auto' : '36px', minWidth: 0 } },
            h('button', {
              type: 'button',
              title: label,
              'aria-label': label,
              'data-collapsed': wide ? undefined : 'true',
              onClick: () => { if (openSettings) openSettings(); },
              onMouseEnter: () => setHover(true),
              onMouseLeave: () => setHover(false),
              style: buttonStyle,
            },
              h(SettingsIcon, { size: wide ? 16 : 18 }),
              wide ? h('span', { style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, label) : null,
            ),
          );
        }

        // settings.launcher is a single slot: a lower priority shadows the shipped
        // account "More" launcher, so our Settings button takes that exact seat.
        ctx.slots.inject('settings.launcher', () => ctx.slots.register(
          { name: 'settings.launcher', priority: -1 },
          SettingsButton,
        ));
      },
    };
  },
});
