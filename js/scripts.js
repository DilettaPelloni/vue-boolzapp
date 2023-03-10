const { createApp } = Vue;

createApp({
    data() {
        return {
            showByIndex:null,
            unread: null,
            dropMenu: null,
            chatMenu: null,
            active: null,
            newMessage: '',
            searchText: '',
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novit???',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che ?? il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho gi?? mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ]//contacts
        }//return
    },//data
    computed: {
        activeContacts() {
            return this.contacts.filter(contact => contact.visible)
        },//activeContacts
    },//computed
    methods: {
        sendMessage: function() {
            if(this.newMessage != '') {
                this.contacts[this.active].messages.push({
                    date: luxon.DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss'),
                    message: this.newMessage,
                    status: 'sent'
                });
                this.newMessage = '';
                setTimeout (() => {
                    this.contacts[this.active].messages.push({
                        date: luxon.DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss'),
                        message: 'Ok!',
                        status: 'received'
                    });
                }, 1000);
            }
        },//sendMessage
        checkSearch: function() {
            this.contacts.forEach((contact) => {
                if((contact.name.toLowerCase().includes(this.searchText.toLowerCase()))) {
                    contact.visible = true;
                }
                else {
                    contact.visible = false;
                }
            })
        },//checkSearch
        toggleVisibility: function(index, visibleIndex) {
            if(this[visibleIndex] != index) {
                this[visibleIndex] = index;
            }
            else {
                this[visibleIndex] = null;
            }
        },//toggleVisibility
        deleteItem: function(array, index, ...menu) {
            array.splice(index, 1);
            menu.forEach((menu) => {
                this[menu] = null;
            })
        },//deleteItem
        getLastMessage: function(contact) {
            if( contact.messages.length > 0) {
                return contact.messages[contact.messages.length - 1].message;
            }
            else {
                return 'Nessun messaggio in questa chat'
            }
        },//getLastMessage
        getLastDate: function(contact) {
            if( contact.messages.length > 0) {
                return contact.messages[contact.messages.length - 1].date.slice(11,16);
            }
            else {
                return ''
            }
        }//getLastDate
    },//methods
    mounted() {
		
	}//mounted
}).mount('#app');
