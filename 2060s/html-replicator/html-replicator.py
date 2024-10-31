for i in range(1, 101):
    filename = f"page{i}.html"
    with open(filename, 'w') as f:
        f.write(f"""<html>
<head>
    <title>Page {i}</title>
</head>
<body>
    <h1>This is page {i}</h1>
    <p>Welcome to page {i}.</p>
</body>
</html>""")
