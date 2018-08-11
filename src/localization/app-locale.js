import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
  en: {
    search: 'Search',
    select: 'Select',
    send: 'Send',

    table: {
      filterConfirm: 'Ok',
      filterReset: 'Reset',
      emptyText: 'No Data',
    },
  },
  de: {
    search: 'Suchen',
    select: 'Auswählen',
    send: 'Senden',

    table: {
      filterConfirm: 'Ok',
      filterReset: 'Zurücksetzen',
      emptyText: 'Keine Daten',
    },
  },
});

export default strings;
