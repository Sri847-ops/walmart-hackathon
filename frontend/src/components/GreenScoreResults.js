const GreenScoreResults = ({ data }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBg = (score) => {
    if (score >= 80) return "bg-green-500/10";
    if (score >= 60) return "bg-yellow-500/10";
    return "bg-red-500/10";
  };

  if (!data || !Array.isArray(data.products)) {
    return (
      <div className="mt-8 text-center text-muted-foreground">
        Loading results or no data available.
      </div>
    );
  }

  return (
    <div className="mt-8 bg-card rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-card-foreground">
        🌱 Green Score Results
      </h2>

      {/* Overall Score */}
      <div
        className={`text-center mb-8 p-6 rounded-lg ${getScoreBg(
          data.overall_score
        )}`}
      >
        <h3 className="text-xl font-semibold mb-2 text-card-foreground">
          Overall Cart Score
        </h3>
        <div
          className={`text-5xl font-bold ${getScoreColor(data.overall_score)}`}
        >
          {data.overall_score}/100
        </div>
        <p className="text-muted-foreground mt-2">
          {data.overall_score >= 80
            ? "Excellent sustainability!"
            : data.overall_score >= 60
            ? "Good, but room for improvement"
            : "Consider more eco-friendly alternatives"}
        </p>

        {/* Eco-Coins Earned */}
        {typeof data.total_coins === "number" && (
          <div className="mt-4">
            <p className="text-lg font-medium text-card-foreground">
              🎁 Eco-Coins Earned:{" "}
              <span className="text-green-500 font-bold">
                {data.total_coins}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Individual Product Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.products.map((product, index) => (
          <div key={index} className="border border-border rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-3 text-card-foreground">
              {product.name}
            </h4>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overall Score:</span>
                <span className={`font-bold ${getScoreColor(product.score)}`}>
                  {product.score}/100
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Packaging:</span>
                <span className={getScoreColor(product.packaging_score)}>
                  {product.packaging_score}/100
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping:</span>
                <span className={getScoreColor(product.shipping_score)}>
                  {product.shipping_score}/100
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Materials:</span>
                <span className={getScoreColor(product.ingredients_score)}>
                  {product.ingredients_score}/100
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Quantity:</span>
                <span className="text-card-foreground">{product.quantity}</span>
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-sm mb-2 text-card-foreground">
                💡 Suggestions:
              </h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                {product.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GreenScoreResults;
