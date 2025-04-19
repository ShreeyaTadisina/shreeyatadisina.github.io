document.addEventListener('DOMContentLoaded', function() {
    // Employee data
    const employees = [
        { name: "Tony Tiger", email: "ttiger@sneakytiger.com", years: 5, department: "Marketing", salary: 75000 },
        { name: "Luna Lovegood", email: "llovegood@yahoo.com", years: 3, department: "Design", salary: 68000 },
        { name: "Peter Parker", email: "spidey@sneakytiger.com", years: 2, department: "Design", salary: 65000 },
        { name: "Mickey Mouse", email: "mmouse@disney.com", years: 15, department: "Management", salary: 120000 },
        { name: "Daffy Duck", email: "dduck@wb.com", years: 8, department: "Sales", salary: 85000 },
        { name: "Bugs Bunny", email: "bbunny@wb.com", years: 12, department: "Sales", salary: 95000 },
        { name: "Minnie Mouse", email: "minnie@disney.com", years: 10, department: "Marketing", salary: 80000 },
        { name: "Scrooge McDuck", email: "scrooge@money.com", years: 25, department: "Finance", salary: 250000 }
    ];

    // Calculate totals
    const totalYears = employees.reduce((sum, emp) => sum + emp.years, 0);
    const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);

    // To help it find main section
    const main = document.querySelector('main');
    
    // Add My Tabular Data section
    const tabularDataHeading = document.createElement('h3');
    tabularDataHeading.textContent = 'My Tabular Data';
    main.appendChild(tabularDataHeading);
    
    const ol = document.createElement('ol');
    employees.forEach((emp) => {
        const li = document.createElement('li');
        li.textContent = `${emp.name} ${emp.email} ${emp.years}`;
        ol.appendChild(li);
    });
    main.appendChild(ol);
    
    // Add Simple Table
    const simpleTableHeading = document.createElement('h3');
    simpleTableHeading.textContent = 'Employee Data in Simple Table';
    main.appendChild(simpleTableHeading);
    
    const simpleTable = document.createElement('table');
    
    // Create header row
    const headerRow = document.createElement('tr');
    ['Name', 'Email', 'Years of Service'].forEach((text) => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    simpleTable.appendChild(headerRow);
    
    // Add employee rows
    employees.forEach((emp) => {
        const row = document.createElement('tr');
        [emp.name, emp.email, emp.years].forEach((text) => {
            const td = document.createElement('td');
            td.textContent = text;
            row.appendChild(td);
        });
        simpleTable.appendChild(row);
    });
    
    main.appendChild(simpleTable);
    
    // Add Complex Table
    const complexTableHeading = document.createElement('h3');
    complexTableHeading.textContent = 'Employee Data in Complex Table';
    main.appendChild(complexTableHeading);
    
    const figure = document.createElement('figure');
    const complexTable = document.createElement('table');
    
    // Group employees by department
    const departments = {};
    employees.forEach((emp) => {
        if (!departments[emp.department]) {
            departments[emp.department] = [];
        }
        departments[emp.department].push(emp);
    });
    
    // Create header row for complex table
    const complexHeaderRow = document.createElement('tr');
    ['Department', 'Name', 'Email', 'Years of Service', 'Monthly Salary'].forEach((text) => {
        const th = document.createElement('th');
        th.textContent = text;
        complexHeaderRow.appendChild(th);
    });
    complexTable.appendChild(complexHeaderRow);
    
    // Add employee rows grouped by department
    Object.keys(departments).forEach((dept) => {
        const deptEmployees = departments[dept];
        deptEmployees.forEach((emp, index) => {
            const row = document.createElement('tr');
            
            // Department cell with rowspan if first in group
            if (index === 0) {
                const deptCell = document.createElement('td');
                deptCell.rowSpan = deptEmployees.length;
                deptCell.textContent = dept;
                row.appendChild(deptCell);
            }
            
            // Employee data cells
            [emp.name, emp.email, emp.years, (emp.salary/12).toFixed(2)].forEach((text) => {
                const td = document.createElement('td');
                td.textContent = text;
                row.appendChild(td);
            });
            
            complexTable.appendChild(row);
        });
    });
    
    // Add footer row with totals
    const footerRow = document.createElement('tr');
    const totalTh = document.createElement('th');
    totalTh.colSpan = 3;
    totalTh.textContent = 'Total Years of Service';
    footerRow.appendChild(totalTh);
    
    const totalYearsTd = document.createElement('td');
    totalYearsTd.textContent = totalYears;
    footerRow.appendChild(totalYearsTd);
    
    const totalSalaryTd = document.createElement('td');
    totalSalaryTd.textContent = (totalSalary/12).toFixed(2);
    footerRow.appendChild(totalSalaryTd);
    
    complexTable.appendChild(footerRow);
    
    // Add caption
    const caption = document.createElement('figcaption');
    caption.textContent = 'Employee Information for SneakyTiger Puzzle Company';
    figure.appendChild(caption);
    figure.appendChild(complexTable);
    main.appendChild(figure);
    
    // Add CSS for table styling
    const style = document.createElement('style');
    style.textContent = `
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            padding: 8px;
            text-align: left;
            border: 1px solid #E76F51;
        }
        th {
            background-color: #264653;
            color: #E9C46A;
        }
        tr:nth-child(even) {
            background-color: #2A9D8F;
            color: #264653;
        }
        tr:nth-child(odd) {
            background-color: #E9C46A;
            color: #264653;
        }
        figure {
            margin: 20px 0;
        }
        figcaption {
            font-style: italic;
            text-align: center;
            margin-bottom: 10px;
        }
    `;
    document.head.appendChild(style);
});