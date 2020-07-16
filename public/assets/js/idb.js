// IndexedDB related  (script file reference to frontend, add-user.html)

// variable will store the db object when connected
let db;
// request variable as the event listener, will connect to the IndexedDB db 'socialnetapi4', an dset to version 1
const request = indexedDB.open('socialnetapi7', 1);