import { Component, OnInit } from '@angular/core';
import { Tutors } from '../../../_system/_interfaces/tutors';
import { TutorsService } from '../../../_system/_services/tutors/tutors.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
  standalone: false,
})
export class AboutUsComponent implements OnInit {
  public tutorsList?: Tutors[]

  constructor(
    private tutorsService: TutorsService,
  ) {}

  ngOnInit(): void {
    this.loadAllTutors();
  }

  loadAllTutors(): void {
    this.tutorsService.getAllTutors().subscribe(data => {
      this.tutorsList = data;
    })
  }
}
