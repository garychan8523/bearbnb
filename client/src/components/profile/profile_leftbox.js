import React from "react";
import { connect } from "react-redux";

const ProfileLeftBox = props => {
  let verifiedList = "";
  let aboutMe = "";

  if (!props.profile) {
    return "";
  }
  if (props.profile.school || props.profile.work || props.profile.languages) {
    aboutMe = makeAboutMe(props.profile, props.homes);
  }

  if (
    props.profile.verified.id ||
    props.profile.verified.info ||
    props.profile.verified.email ||
    props.profile.verified.phone ||
    props.profile.verified.workemail
  ) {
    verifiedList = makeVerified(props.profile);
  }

  return (
    <div className="profile-leftbox">
      {showAvatar(props.profile)}
      {verifiedList}
      {aboutMe}
      {Object.keys(props.profile.homeids).map(key => {
        let image = props.homes[props.profile.homeids[key]].images[0];
        let city = props.homes[props.profile.homeids[key]].homelocation.city;
        let title =
          props.homes[props.profile.homeids[key]].homeinformation.title;
        let href = props.profile.homeids[key];
        return (
          <div key={key} className="profile-leftbox-listing">
            <a href={`/homes/${href}`}>
              <img
                src={require(`../../stylesheets/assets/homeimages/${image}`)}
                alt=""
              />
              <h4>
                <div>{title}</div>
                <div>{city}</div>
              </h4>
            </a>
          </div>
        );
      })}
    </div>
  );
};

function showAvatar(profile) {
  return (
    <div className="profile-avatar">
      <img
        src={require(`../../stylesheets/assets/images/${profile.image}`)}
        alt=""
      />
    </div>
  );
}

//Not currently in use, but retaining for multi picture possibility.
// function makeSlideshow(profile) {
//   //when the image situation is sorted out,
//   //this should be
//   //hostinfo.images.forEach
//   let activeImage = 0;
//   function imageSlide(ind) {
//     let images = document.getElementsByClassName("hostimg");
//     let dots = document.getElementsByClassName("slideshowDot");

//     if (ind === "left") {
//       if (activeImage === 0) {
//         return;
//       }
//       activeImage--;
//     } else if (ind === "right") {
//       if (activeImage === images.length - 1) {
//         return;
//       }
//       activeImage++;
//     } else {
//       activeImage = ind;
//     }

//     for (let i = 0; i < images.length; i++) {
//       images[i].classList.add("hidden");
//       if (activeImage === i) {
//         images[i].classList.remove("hidden");
//       }
//     }

//     for (let i = 0; i < images.length; i++) {
//       dots[i].classList.remove("slideshowDot--active");
//       if (activeImage === i) {
//         dots[i].classList.add("slideshowDot--active");
//       }
//     }
//   }

//   let images = [];
//   let slideshowDots = [];
//   let activeDot = "";
//   let activeImg = "";
//   const placeholderImages = [PlaceHolderImg1, PlaceHolderImg2, PlaceHolderImg3];
//   for (let i = 0; i < 3; i++) {
//     if (i === 0) {
//       activeDot = " slideshowDot--active";
//       activeImg = "";
//     } else {
//       activeDot = "";
//       activeImg = " hidden";
//     }
//     images.push(
//       <img
//         key={i + profile.id.toString()}
//         alt=""
//         src={placeholderImages[i]}
//         className={"hostimg" + activeImg}
//       />
//     );
//     slideshowDots.push(
//       <svg
//         key={"ssDot" + i}
//         className={"slideshowDot" + activeDot}
//         viewBox="0 0 19.88 19.88"
//         onClick={imageSlide.bind(this, i)}
//       >
//         <circle cx="10" cy="10" r="10" />
//       </svg>
//     );
//   }

//   return (
//     <div className="host-bio-leftbox__slideshow">
//       {images}
//       <div className="host-bio-leftbox__slideshow-controls">
//         <button
//           type="button"
//           className="slideshowArrow slideshowArrow--left"
//           onClick={() => imageSlide("left")}
//         >
//           <svg className="slideshowArrow--svg" viewBox="0 0 11.86 19.79">
//             <polyline points="11.11 0.72 1.46 9.91 11.18 19.06" />
//           </svg>
//         </button>
//         <button
//           type="button"
//           className="slideshowArrow slideshowArrow--right"
//           onClick={() => imageSlide("right")}
//         >
//           <svg className="slideshowArrow--svg" viewBox="0 0 11.86 19.79">
//             <polyline points="0.75 0.72 10.41 9.91 0.69 19.06" />
//           </svg>
//         </button>
//       </div>
//       <div className="host-bio-leftbox__slideshow-controls-dots">
//         {slideshowDots}
//       </div>
//     </div>
//   );
// }

function makeVerified(profile) {
  let verifiedList = [];
  const infoTitles = {
    id: "Government ID",
    info: "Personal info",
    email: "Email address",
    phone: "Phone Number",
    workemail: "Work Email"
  };

  for (let verified in profile.verified) {
    if (profile.verified[verified]) {
      verifiedList.push(
        <li key={profile.id.toString() + verified}>
          <div className="profile-leftbox__infobox-body-info">
            <span>{infoTitles[verified]}</span>
            <svg
              className="profile-leftbox__infobox-body-info--check"
              viewBox="0 0 22.67 22.67"
            >
              <circle
                cx="12.5"
                cy="12.17"
                r="10.83"
                transform="translate(-4.87 4.88) rotate(-22.5)"
              />
              <polyline points="6.46 11.33 9.46 14.17 16.21 8.04" />
            </svg>
          </div>
        </li>
      );
    }
  }

  return (
    <div className="profile-leftbox__infobox">
      <div className="profile-leftbox__infobox-header">Verified Info</div>
      <div className="profile-leftbox__infobox-body">
        <ul className="profile-leftbox__infobox-body-list">{verifiedList}</ul>
        <a className="profile-leftbox__infobox--learnmore">Learn more »</a>
      </div>
    </div>
  );
}

function makeAboutMe(profile, homes) {
  let aboutme = [];

  function makeAboutMeDiv(title, info) {
    // let infostring = "";
    if (Array.isArray(info)) {
      info = info.join(", ");
    }
    aboutme.push(
      <div
        key={profile.id + title}
        className="profile-leftbox__about-body-aboutitem"
      >
        <span className="profile-leftbox__about-body-aboutitem--title">
          {title}
        </span>
        <br />
        <span>{info}</span>
      </div>
    );
  }

  if (profile.school) {
    makeAboutMeDiv("Schools", profile.school);
  }
  if (profile.work) {
    makeAboutMeDiv("Work", profile.work);
  }
  if (profile.languages) {
    makeAboutMeDiv("Languages", profile.languages);
  }

  return (
    <div className="profile-leftbox__infobox">
      <div className="profile-leftbox__infobox-header">About me</div>
      <div className="profile-leftbox__infobox-body">{aboutme}</div>
    </div>
  );
}

function mapStateToProps({ profile }) {
  return { profile };
}

export default connect(mapStateToProps)(ProfileLeftBox);
