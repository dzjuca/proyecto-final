import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  cards = [
    {
      avatarImageUrl: 'assets/img/avatar/rocio.jpeg',
      postImageUrl: 'assets/img/card/rocio_card.jpeg',
      name: 'Rocío Barros',
      postText: 'Así llegamos a Carnaval después de toda la conmoción emocional, hormonal y de tercera dosis... ',
      date: 'Abril 25, 2022',
      likes: 56,
      comments: 1,
      timestamp: '11h ago'
    },
    {
      avatarImageUrl: 'assets/img/avatar/alejo.jpeg',
      postImageUrl: 'assets/img/card/alejo_card.jpeg',
      name: 'Alejo Arroyo',
      postText: '',
      date: 'Diciembre 31, 2018',
      likes: 1,
      comments: 0,
      timestamp: '11h ago'
    },
    {
      avatarImageUrl: 'assets/img/avatar/marty-avatar.png',
      postImageUrl: 'assets/img/card/advance-card-bttf.png',
      name: 'Marty Mcfly',
      postText: 'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.',
      date: 'November 5, 1955',
      likes: 12,
      comments: 4,
      timestamp: '11h ago'
    },
    {
      avatarImageUrl: 'assets/img/avatar/sarah-avatar.jpeg',
      postImageUrl: 'assets/img/card/advance-card-tmntr.jpeg',
      name: 'Sarah Connor',
      postText: 'I face the unknown future, with a sense of hope. Because if a machine, a Terminator, can learn the value of human life, maybe we can too.',
      date: 'May 12, 1984',
      likes: 30,
      comments: 64,
      timestamp: '30yr ago'
    },
    {
      avatarImageUrl: 'assets/img/avatar/ian-avatar.png',
      postImageUrl: 'assets/img/card/advance-card-jp.jpeg',
      name: 'Dr. Ian Malcolm',
      postText: 'Your scientists were so preoccupied with whether or not they could, that they didn\'t stop to think if they should.',
      date: 'June 28, 1990',
      likes: 46,
      comments: 66,
      timestamp: '2d ago'
    },
  ];

  constructor(public navCtrl:NavController ) { }

  ngOnInit() {
  }


  imageTapped(card) {
    alert(card.name + ' image was tapped.');
  }

  like(card) {
    alert(card.name + ' was liked.');
  }

  comment(card) {
    alert('Commenting to ' + card.name);
  }

  avatarTapped(card) {
    alert(card.name + ' avatar was tapped.');
  }

}
