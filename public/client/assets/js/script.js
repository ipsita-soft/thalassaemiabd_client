

// tif gallery


$(document).ready(function() {
    $('.first-sample .slider').blue_slider({
      // slide_template: '1fr 2fr 1fr',
      // slide_template: '1fr 1fr',
      // slide_template: '1fr',
      slide_template: '1fr 4fr (2,1fr) .5fr',
      current_fr_index: 2,
      current_fr_index_flow: false,
      // speed: 500,
      // ease_function: 'cubic-bezier(.32,.38,.16,.98)',
      // slide_step: 1,
      current_fr_class: 'my-fr-current',
      active_fr_class: 'my-fr-active',
      custom_fr_class: '       fr-1         fr-2        fr-3    ',
      // left_padding: 100,
      // right_padding: 100,
      slide_gap: 10,
      // speed: 1000,
      ease_function: 'ease-in-out',
      sencitive_drag: 100,
      loop: false,
      auto_play: true,
      auto_play_period: 5000,
      start_slide_index: 0,
      arrows: true,
      prev_arrow: '.first-sample .prev-slide',
      next_arrow: '.first-sample .next-slide',
    });
  });
  