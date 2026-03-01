import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: false,
  pure: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {
  console.log('term in pipe:', term);
  console.log('contacts in pipe:', contacts);
  
  if (!term || term.trim().length === 0) {
    return contacts;
  }

  const result = contacts.filter(
    (contact: Contact) => contact.name.toLowerCase().includes(term.toLowerCase())
  );

  console.log('filtered result:', result);
  return result;
}

}