window.onload = function () {
    ["header", "main", "sidebar"].forEach(function (id) {
        buildHTML(id);
    });
    applyStyles();
};

function buildHTML(id) {
    switch (id) {
        case "main":
            createExperienceElements();
            break;
        case "sidebar":
            createSidebarElements();
            break;
        default:
            fetch(`elements/${id}.html`)
                .then((response) => response.text())
                .then((data) => {
                    document.getElementById(id).innerHTML = data;
                });
            break;
        }
}

function applyStyles() {
    let link = document.createElement("link");
    link.href = "./styles.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
}

function createExperienceElements() {
    fetch("data/data.json")
        .then((response) => response.json())
        .then((data) => {
            let experiencesDiv = document.getElementById("main");
            let h2 = document.createElement("h2");
            h2.textContent = "Experiences";
            experiencesDiv.appendChild(h2);
            data.experiences.forEach((exp) => {
                let h3 = document.createElement("h3");
                h3.textContent = exp.title;
                experiencesDiv.appendChild(h3);

                let p = document.createElement("p");
                p.textContent = exp.period;
                experiencesDiv.appendChild(p);

                let ul = document.createElement("ul");
                exp.tasks.forEach((task) => {
                    let li = document.createElement("li");
                    li.textContent = task;
                    ul.appendChild(li);
                });
                experiencesDiv.appendChild(ul);
            });
        });
}
function createSidebarElements() {
    fetch("data/data.json")
        .then((response) => response.json())
        .then((data) => {
            var sidebarDiv = document.getElementById("sidebar");

            // Education
            var h2 = document.createElement("h2");
            h2.textContent = "Education";
            sidebarDiv.appendChild(h2);

            data.education.forEach((edu) => {
                var h3 = document.createElement("h3");
                h3.textContent = edu.school;
                sidebarDiv.appendChild(h3);
                
                var p = document.createElement("p");
                p.textContent = edu.period;
                sidebarDiv.appendChild(p);
                
                var p = document.createElement("p");
                p.textContent = edu.major;
                sidebarDiv.appendChild(p);

                var ul = document.createElement("ul");
                edu.notes.forEach((note) => {
                    var li = document.createElement("li");
                    li.textContent = note;
                    ul.appendChild(li);
                });
                sidebarDiv.appendChild(ul);
            });

            // Skills
            var h2 = document.createElement("h2");
            h2.textContent = "Skills";
            sidebarDiv.appendChild(h2);

            var ul = document.createElement("ul");
            
            var li = document.createElement("li");
            li.textContent = "Proficient in " + data.skills[0].languages.join(', ');
            ul.appendChild(li);

            data.skills[0].notes.forEach((note) => {
                if(note == "") return;
                li = document.createElement("li");
                li.textContent = note;
                ul.appendChild(li);
            });
            sidebarDiv.appendChild(ul);


            // Projects
            h2 = document.createElement("h2");
            h2.textContent = "Projects";
            sidebarDiv.appendChild(h2);

            var ul = document.createElement("ul");
            data.projects.forEach((proj) => {
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.textContent = proj.name;
                a.href = proj.link;
                a.target = "_blank";
                li.appendChild(a);
                ul.appendChild(li);
            });
            sidebarDiv.appendChild(ul);

            // Info
            h2 = document.createElement("h2");
            h2.textContent = "Info";
            sidebarDiv.appendChild(h2);

            ul = document.createElement("ul");
            data.Info[0].links.forEach((info) => {
                li = document.createElement("li");
                var a = document.createElement("a");
                a.textContent = info.name;
                a.href = info.link;
                a.target = "_blank";
                li.appendChild(a);
                ul.appendChild(li);
            });
            sidebarDiv.appendChild(ul);
        });
}